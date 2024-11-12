import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@nextui-org/react";
import { MailIcon } from "../../public/MailIcon";
import { LockIcon } from "../../public/LockIcon";
import { auth, createUserWithEmailAndPassword } from "@/utils/firebaseConfig";

export default function Signup({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      onClose();
    } catch (error) {
      setError("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent className="p-8 rounded-xl shadow-2xl bg-white w-full max-w-lg mx-auto">
        <ModalHeader className="flex flex-col gap-2 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Create Your Account</h3>
          <p className="text-sm text-gray-600">Fill in the details to sign up</p>
        </ModalHeader>
        <ModalBody>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Input
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endContent={<MailIcon className="text-xl text-gray-400 pointer-events-none" />}
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            className="py-3 px-4 text-base"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={<LockIcon className="text-xl text-gray-400 pointer-events-none" />}
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            className="mt-6"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endContent={<LockIcon className="text-xl text-gray-400 pointer-events-none" />}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
            className="mt-6"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </ModalFooter>
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?
          <Link
            href="#"
            onClick={onSwitchToLogin} 
            className="text-blue-600 hover:underline ml-1"
          >
            Log in
          </Link>
        </p>
      </ModalContent>
    </Modal>
  );
}
