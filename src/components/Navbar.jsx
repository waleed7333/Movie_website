"use client"
import React, { useState, useEffect } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Tooltip,
} from "@nextui-org/react"
import Link from "next/link"
import Login from "./Login"
import Signup from "./Signup"
import ThemeToggle from "./ThemeToggle"
import { auth, logout } from "@/utils/firebaseConfig"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [reRender, setReRender] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Actors", href: "/actors" },
    { label: "Tv Shows", href: "/tvshow" },
  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
    return () => unsubscribe()
  }, [reRender])

  const handleLogout = async () => {
    try {
      await logout(auth)
      setCurrentUser(null)
      setReRender((prev) => !prev)
      console.log("User successfully logged out")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Movies
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Movies
          </Link>
        </NavbarBrand>
        {menuItems.slice(0, 4).map((item) => (
          <NavbarItem key={item.label}>
            <Link href={item.href} className="nav-link">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        {currentUser ? (
          <div className="flex items-center space-x-3">
            <Tooltip content={currentUser.email} placement="bottom">
              <Avatar
                text={currentUser.email[0]}
                color="primary"
                bordered
                size="md"
                zoomed
              />
            </Tooltip>
            <span className="font-semibold text-primary">
              {currentUser.email}
            </span>
            <Button
              color="warning"
              variant="flat"
              onPress={handleLogout}
              className="ml-2"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <NavbarItem>
              <Button
                color="warning"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Log In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="warning"
                variant="flat"
                onPress={() => setIsSignupOpen(true)}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full text-red-500" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </Navbar>
  )
}
