"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/authService";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter(); // Use Next.js router
  const [value, setValue] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality
    logout();
    router.push("/login"); // Redirect to login page
  };

  return (
    <>
      <header className="text-gray-600 body-font shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                role="combobox"
                className="w-[100px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Teams</DropdownMenuItem>
              <DropdownMenuItem>Personal Account</DropdownMenuItem>
              <DropdownMenuItem>Members</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="md:mr-auto cursor-pointer md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" href="/dashboard">
              Dashboard
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/machines">
              Machines
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/assets">
              Assets
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/inspections">
              Inspection
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/clients">
              Clients
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/orders">
              Orders
            </Link>
          </nav>
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 mx-4"
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AccountCircleIcon
                sx={{ fontSize: "30px", pointerEvents: "none" }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Password</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Navbar;
