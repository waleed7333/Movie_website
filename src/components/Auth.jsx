import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const [isModalOpen, setIsModalOpen] = useState(false);  // حالة تحديد إذا كانت النافذة مفتوحة
    const [isLogin, setIsLogin] = useState(true);  // حالة لتحديد النافذة المفتوحة (تسجيل دخول أو تسجيل)

    const openLogin = () => {
        setIsLogin(true);  // عرض نافذة تسجيل الدخول
        setIsModalOpen(true);  // فتح النافذة
    };

    const openSignup = () => {
        setIsLogin(false);  // عرض نافذة التسجيل
        setIsModalOpen(true);  // فتح النافذة
    };

    const closeModal = () => {
        setIsModalOpen(false);  // إغلاق النافذة
    };

    return (
        <>
            {isLogin ? (
                <Login
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSwitchToSignup={openSignup}
                />
            ) : (
                <Signup
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSwitchToLogin={openLogin}
                />
            )}
        </>
    );
}
