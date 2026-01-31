'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserData } from '../BookingWizard';

const userSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Invalid phone number"),
    college: z.string().min(2, "College name is required"),
    gender: z.string().min(1, "Select gender"),
    age: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 10, "Invalid age"),
    city: z.string().min(2, "City is required"),
    tshirtSize: z.string().min(1, "Select size"),
});

interface UserDetailsProps {
    data: UserData;
    updateData: (data: UserData) => void;
    onNext: () => void;
}

export default function UserDetails({ data, updateData, onNext }: UserDetailsProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
        resolver: zodResolver(userSchema),
        defaultValues: data
    });

    const onSubmit = (formData: UserData) => {
        updateData(formData);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 text-white border-l-4 border-neon-cyan pl-4">
                Personal <span className="text-neon-cyan">Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Full Name */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Full Name</label>
                    <input {...register("fullName")} className="input-field" placeholder="John Doe" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email Address</label>
                    <input {...register("email")} className="input-field" placeholder="athlete@college.edu" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                    <input {...register("phone")} className="input-field" placeholder="+91 9876543210" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Age */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Age</label>
                    <input {...register("age")} className="input-field" placeholder="21" type="number" />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>


                {/* Gender */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Gender</label>
                    <select {...register("gender")} className="input-field appearance-none cursor-pointer">
                        <option value="" className="bg-black">Select Gender</option>
                        <option value="Male" className="bg-black">Male</option>
                        <option value="Female" className="bg-black">Female</option>
                        <option value="Other" className="bg-black">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                </div>

                {/* T-Shirt Size */}
                <div className="group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">T-Shirt Size</label>
                    <select {...register("tshirtSize")} className="input-field appearance-none cursor-pointer">
                        <option value="" className="bg-black">Select Size</option>
                        <option value="S" className="bg-black">Small (S)</option>
                        <option value="M" className="bg-black">Medium (M)</option>
                        <option value="L" className="bg-black">Large (L)</option>
                        <option value="XL" className="bg-black">Extra Large (XL)</option>
                    </select>
                    {errors.tshirtSize && <p className="text-red-500 text-xs mt-1">{errors.tshirtSize.message}</p>}
                </div>

                {/* College */}
                <div className="group md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">University / College</label>
                    <input {...register("college")} className="input-field" placeholder="Institute of Technology..." />
                    {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college.message}</p>}
                </div>

                {/* City */}
                <div className="group md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">City</label>
                    <input {...register("city")} className="input-field" placeholder="Mumbai, Delhi..." />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
            </div>

            <div className="mt-auto flex justify-end">
                <button type="submit" className="btn-primary">
                    Next: Select Sports &rarr;
                </button>
            </div>
        </form>
    );
}
