"use client"; // Add this for Next.js 13+ client components

import React, { useState } from "react";
import styles from "./Login.module.css"; // Make sure this file exists

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export default function Login() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user starts typing
        if (errors[name as keyof LoginFormErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Replace with your actual login API call
            // Example:
            // const response = await loginApi(formData.email, formData.password);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Handle successful login
            console.log("Login successful", formData);

            // Redirect to dashboard or home page
            // window.location.href = "/dashboard";
        } catch (error) {
            // Handle login error
            setErrors({
                general: "Invalid email or password. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.title}>Log In</h1>
                <p className={styles.subtitle}>
                    Welcome back! Please enter your details.
                </p>

                {errors.general && (
                    <div className={styles.errorMessage}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? styles.inputError : ""}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <span className={styles.errorText}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? styles.inputError : ""}
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <span className={styles.errorText}>
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className={styles.formOptions}>
                        <div className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                disabled={isLoading}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a
                            href="/forgot-password"
                            className={styles.forgotPassword}
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Log in"}
                    </button>

                    <div className={styles.signupPrompt}>
                        Don&apos;t have an account?{" "}
                        <a href="/register" className={styles.signupLink}>
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
