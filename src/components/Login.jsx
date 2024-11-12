import { Modal, ModalContent, ModalBody, ModalFooter, Button, Input, Link } from "@nextui-org/react";
import { MailIcon } from "../../public/MailIcon";
import { LockIcon } from "../../public/LockIcon";
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from "@/utils/firebaseConfig";
import { useState } from "react";
import { GoogleIcon } from "../../public/GoogleIcon";
import { AppleIcon } from "../../public/AppleIcon";

export default function Login({ isOpen, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // إغلاق النافذة بعد تسجيل الدخول
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error logging in: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      onClose(); // إغلاق النافذة بعد تسجيل الدخول مع Google
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent className="p-8 rounded-xl shadow-2xl bg-white w-full max-w-lg mx-auto">
        <ModalBody>
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Log in with</h3>
          <div className="login_option flex flex-row items-center gap-4 mb-6">
            <Button
              onClick={handleGoogleLogin}
              className="flex items-center bg-white text-gray-700 w-full justify-center border border-gray-300 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <GoogleIcon className="text-xl mr-2" />
              <span>Google</span>
            </Button>
            <Button className="flex items-center bg-white text-gray-700 w-full justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300">
              <AppleIcon className="text-xl mr-2" />
              <span>Apple</span>
            </Button>
          </div>
          <p className="text-center relative flex items-center justify-center my-6">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="absolute bg-white px-4 text-gray-500 text-sm">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endContent={<MailIcon className="text-xl text-gray-400" />}
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            className="mb-5"
            inputClassName="py-3 px-4 text-base"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={<LockIcon className="text-xl text-gray-400" />}
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            className="mb-6"
            inputClassName="py-3 px-4 text-base"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Log In
          </Button>
        </ModalFooter>
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?
          <Link
            href="#"
            onClick={onSwitchToSignup} // استدعاء وظيفة التبديل عند النقر
            className="text-blue-600 hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </ModalContent>
    </Modal>
  );
}
