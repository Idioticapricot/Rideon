import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../../utils/supabaseClient';
import ProfileInfo from '../Cards/ProfileInfo';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); 
  };

  const showProfileInfo = location.pathname === "/dashboard" || location.pathname === "/bikes/:bikeId"; 

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <motion.h2 
            className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ride On
          </motion.h2>
        </Link>

        

        {showProfileInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="ml-auto"
          >
            <ProfileInfo onLogout={handleLogout} />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;