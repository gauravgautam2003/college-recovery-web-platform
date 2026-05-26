/**
 * College Profile Edit Form Component
 * Form for college administrators to edit their college's profile information
 * 
 * Features:
 * - Multi-field form for college details
 * - Real-time validation
 * - Separate sections for basic info, academics, placement, and facilities
 * - Dynamic array handling for courses, recruiters, and facilities
 */

"use client";

import { useState } from "react";
import { useForm, useFieldArray, type UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Plus, Trash2, AlertCircle, Upload } from "lucide-react";
import type { College } from "@/types/college";

interface CollegeEditFormProps {
    initialData?: College;
    onSuccess?: (college: College) => void;
    submitUrl?: string;
    requestMethod?: "POST" | "PATCH" | "PUT";
    authToken?: string | null;
    submitLabel?: string;
    onCancel?: () => void;
}

/**
 * Component to render dynamic array fields
 * Used for courses, recruiters, and facilities
 */
function DynamicArrayField({
    label,
    fields,
    append,
    remove,
    fieldName,
    register,
}: {
    label: string;
    fields: { id: string; value?: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
    fieldName: "courses" | "topRecruiters" | "facilities";
    register: UseFormRegister<College>;
}) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                        <input
                            {...register(`${fieldName}.${index}`)}
                            defaultValue={field.value ?? ""}
                            type="text"
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                            title="Remove item"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append("")}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add {label.toLowerCase()}
                </button>
            </div>
        </div>
    );
}

export default function CollegeEditForm({
    initialData,
    onSuccess,
    submitUrl = "/api/colleges/admin/profile",
    requestMethod,
    authToken,
    submitLabel = "Save Changes",
    onCancel,
}: CollegeEditFormProps) {
    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // React Hook Form setup
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<College>({
        defaultValues: initialData || {
            name: "",
            shortName: "",
            location: "",
            type: "",
            description: "",
            rank: undefined,
            rating: undefined,
            fees: "",
            feesValue: 0,
            averagePackage: "",
            averagePackageValue: 0,
            courses: [],
            acceptanceRate: "",
            placementRate: "",
            topRecruiters: [],
            facilities: [],
            admissionDeadline: "",
            contactEmail: "",
            phone: "",
            image: "",
            website: "",
            establishedAt: undefined,
        },
    });

    // Field array hooks for dynamic fields
    const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
        control,
        name: "courses" as never,
    });

    const { fields: recruiterFields, append: appendRecruiter, remove: removeRecruiter } = useFieldArray({
        control,
        name: "topRecruiters" as never,
    });

    const { fields: facilityFields, append: appendFacility, remove: removeFacility } = useFieldArray({
        control,
        name: "facilities" as never,
    });

    function sanitizeFormData(data: College) {
        const optionalNumber = (value?: number) => (typeof value === "number" && !Number.isNaN(value) ? value : undefined);
        const optionalText = (value?: string) => value?.trim() || undefined;
        const cleanArray = (values?: string[]) => values?.map((item) => item.trim()).filter(Boolean) ?? [];

        // Keep API payload compact so optional empty fields do not fail URL/email validation.
        return {
            ...data,
            rank: optionalNumber(data.rank),
            rating: optionalNumber(data.rating),
            feesValue: optionalNumber(data.feesValue) ?? 0,
            averagePackageValue: optionalNumber(data.averagePackageValue) ?? 0,
            establishedAt: optionalNumber(data.establishedAt),
            image: optionalText(data.image),
            contactEmail: optionalText(data.contactEmail),
            website: optionalText(data.website),
            courses: cleanArray(data.courses),
            topRecruiters: cleanArray(data.topRecruiters),
            facilities: cleanArray(data.facilities),
        };
    }

    async function handleImageUpload(file?: File) {
        if (!file) return;
        if (!authToken) {
            toast.error("Please login as a college owner before uploading images.");
            return;
        }

        try {
            setIsUploading(true);
            setError(null);

            const signatureResponse = await fetch("/api/uploads/cloudinary-signature", {
                method: "POST",
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const signatureResult = await signatureResponse.json();

            if (!signatureResponse.ok) {
                throw new Error(signatureResult.error || "Image upload is not configured.");
            }

            const { cloudName, apiKey, folder, timestamp, signature } = signatureResult.data;
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("api_key", apiKey);
            uploadData.append("folder", folder);
            uploadData.append("timestamp", String(timestamp));
            uploadData.append("signature", signature);

            const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: uploadData,
            });
            const uploadResult = await uploadResponse.json();

            if (!uploadResponse.ok) {
                throw new Error(uploadResult.error?.message || "Image upload failed.");
            }

            setValue("image", uploadResult.secure_url, { shouldDirty: true, shouldValidate: true });
            toast.success("College image uploaded successfully.");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Image upload failed.";
            setError(message);
            toast.error(message);
        } finally {
            setIsUploading(false);
        }
    }

    /**
     * Handle form submission
     * Sends data to the college profile update API
     */
    const onSubmit = async (data: College) => {
        try {
            setIsSubmitting(true);
            setError(null);

            // Call API to update college profile
            const response = await fetch(submitUrl, {
                method: requestMethod ?? (initialData ? "PATCH" : "POST"),
                headers: {
                    "Content-Type": "application/json",
                    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                },
                body: JSON.stringify(sanitizeFormData(data)),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to update college profile");
            }

            toast.success(result.message || "College profile updated successfully!");
            onSuccess?.(result.data ?? result.college);
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Error Alert */}
            {error && (
                <div className="flex gap-3 rounded-lg bg-red-50 p-4 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold">Error</h3>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Basic Information Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {/* College Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            College Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Indian Institute of Technology Delhi"
                            {...register("name", { required: "College name is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Short Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Short Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., IIT Delhi"
                            {...register("shortName")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., New Delhi, India"
                            {...register("location", { required: "Location is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
                    </div>

                    {/* College Type */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("type", { required: "College type is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select type</option>
                            <option value="Public Technical University">Public Technical University</option>
                            <option value="Private Deemed University">Private Deemed University</option>
                            <option value="Government College">Government College</option>
                            <option value="Private University">Private University</option>
                        </select>
                        {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>}
                    </div>

                    {/* Established Year */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Established Year
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 1961"
                            {...register("establishedAt", { valueAsNumber: true })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Describe your college, its mission, and highlights..."
                        {...register("description", { required: "Description is required", minLength: { value: 20, message: "Description must be at least 20 characters" } })}
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        College Logo/Image URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/college-logo.jpg"
                        {...register("image")}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Upload College Image
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {isUploading ? "Uploading..." : "Choose Image"}
                        <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            disabled={isUploading}
                            onChange={(event) => handleImageUpload(event.target.files?.[0])}
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Official Website
                    </label>
                    <input
                        type="url"
                        placeholder="https://www.college.ac.in"
                        {...register("website")}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </fieldset>

            {/* Rankings & Ratings Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Rankings & Ratings</h2>

                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Rank */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            National Rank
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 2"
                            {...register("rank", { valueAsNumber: true })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Rating (0-5)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="e.g., 4.8"
                            {...register("rating", { valueAsNumber: true })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Acceptance Rate */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Acceptance Rate
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., 0.7%"
                            {...register("acceptanceRate")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Fees Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Fees</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Fee Display */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Fee Amount (Display) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Rs. 8.2 Lakhs"
                            {...register("fees", { required: "Fee information is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Fee Value (Numeric) */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Fee Amount (Numeric) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 820000"
                            {...register("feesValue", { valueAsNumber: true, required: "Numeric fee is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Placement Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Placement & Packages</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Average Package Display */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Average Package (Display) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Rs. 24.5 LPA"
                            {...register("averagePackage", { required: "Package information is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Average Package Value (Numeric) */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Average Package (Numeric) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 2450000"
                            {...register("averagePackageValue", { valueAsNumber: true, required: "Numeric package is required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Placement Rate */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Placement Rate
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., 91%"
                            {...register("placementRate")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Top Recruiters */}
                <DynamicArrayField
                    label="Top Recruiters"
                    fields={recruiterFields}
                    append={appendRecruiter}
                    remove={removeRecruiter}
                    fieldName="topRecruiters"
                    register={register}
                />
            </fieldset>

            {/* Academics Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Academics</h2>

                {/* Courses */}
                <DynamicArrayField
                    label="Courses Offered"
                    fields={courseFields}
                    append={appendCourse}
                    remove={removeCourse}
                    fieldName="courses"
                    register={register}
                />
            </fieldset>

            {/* Facilities Section */}
            <fieldset className="space-y-4 border-b pb-6">
                <h2 className="text-lg font-bold text-slate-900">Facilities</h2>

                <DynamicArrayField
                    label="Campus Facilities"
                    fields={facilityFields}
                    append={appendFacility}
                    remove={removeFacility}
                    fieldName="facilities"
                    register={register}
                />
            </fieldset>

            {/* Contact & Admissions Section */}
            <fieldset className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Contact & Admissions</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Contact Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            placeholder="admissions@college.ac.in"
                            {...register("contactEmail")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Contact Phone
                        </label>
                        <input
                            type="tel"
                            placeholder="+91 11 2659 7135"
                            {...register("phone")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Admission Deadline */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Admission Deadline
                        </label>
                        <input
                            type="date"
                            {...register("admissionDeadline")}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Submit Button */}
            <div className="flex gap-3 justify-end border-t pt-6">
                <button
                    type="button"
                    onClick={onCancel ?? (() => window.history.back())}
                    className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
