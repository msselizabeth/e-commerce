"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SignUpFormState {
  firstName: string;
  lastName: string;
  tel: string;
  address: string;
  postalCode: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<SignUpFormState>({
    firstName: "",
    lastName: "",
    tel: "",
    address: "",
    postalCode: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "The password must be at least 8 characters long, contain at least one letter and one special character($,!,^,etc), and no spaces.";
    }
    const nameRegex = /^[A-Za-z]{2,}$/;
    if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName =
        "The first name must contain at least 2 letters without spaces.";
    }
    if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName =
        "The last name must contain at least 2 letters without spaces.";
    }
    const postalCodeRegex = /^[A-Za-z0-9]{6}$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode =
        "The postal code must be exactly 6 characters long and contain only letters and numbers.";
    }
    const phoneRegex =
      /^(\+?\d{1,2})?\s?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    if (!phoneRegex.test(formData.tel)) {
      newErrors.tel = "The phone number is invalid.";
    }
    if (!formData.address || formData.address.trim().length === 0) {
      newErrors.address = "Address cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!validateForm()) {
      return;
    }

    const processingToast = toast.loading("Prossesing your request...");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Registration error");
      }

      toast.update(processingToast, {
        render: "Registration successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        onClose: () => router.push("/login"),
      });

      setFormData({
        firstName: "",
        lastName: "",
        tel: "",
        address: "",
        postalCode: "",
        email: "",
        password: "",
      });
    } catch (err: unknown) {
      toast.update(processingToast, {
        render: err instanceof Error ? err.message : "Undefined error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-md mx-auto p-4 shadow bg-slate-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Registration</h2>

      {[
        { label: "First name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Cell phone", name: "tel", type: "text" },
        { label: "Address", name: "address", type: "text" },
        { label: "Postal code", name: "postalCode", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" },
      ].map((field) => (
        <div className="mb-4" key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium mb-2">
            {field.label}
          </label>
          <input
            name={field.name}
            type={field.type}
            value={formData[field.name as keyof SignUpFormState]}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            required
          />
          {(errors[field.name] as keyof SignUpFormState) && (
            <p className="text-red-600 font-medium text-sm pt-2">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

     <div className="w-full md:w-48 md:mx-auto">  
     <button
        type="submit"
        className="w-full  bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition font-medium uppercase">
        Sign Up
      </button>
        </div>
    </form>
  );
}
