"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    const processingToast = toast.loading("Prosessing your request...");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.update(processingToast, {
          render: result.error,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
     
        toast.update(processingToast, {
          render: "Authentication successful. Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => router.push("/user"),
        });
      
    }} catch (err: unknown) {
     console.log(err)
      toast.update(processingToast, {
        render: "Error" + err,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Вход в систему</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Войти
      </button>
    </form>
  );
}
