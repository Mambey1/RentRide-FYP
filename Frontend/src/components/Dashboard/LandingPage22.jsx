// import React, { useState } from "react";
// import {
//   Car,
//   Shield,
//   Clock,
//   Star,
//   MapPin,
//   Calendar,
//   Users,
//   ChevronRight,
//   CheckCircle,
//   Phone,
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Search,
//   DollarSign,
//   Headphones,
//   Settings,
//   Fuel,
//   Quote,
//   ChevronLeft,
//   ChevronDown,
//   Menu,
//   X,
//   CreditCard,
//   Award,
//   Globe,
//   ShieldCheck,
//   Zap,
//   Heart,
// } from "lucide-react";

// const LandingPage = () => {
//   const [searchQuery, setSearchQuery] = useState({
//     location: "",
//     pickupDate: "",
//     returnDate: "",
//     passengers: 1,
//   });
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching vehicles:", searchQuery);
//   };

//   const nextTestimonial = () => {
//     setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setTestimonialIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   // Data
//   const vehicles = [
//     {
//       id: 1,
//       name: "Tesla Model 3",
//       type: "Electric Sedan",
//       price: 89,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Electric",
//       rating: 4.8,
//     },
//     {
//       id: 2,
//       name: "BMW X5",
//       type: "Luxury SUV",
//       price: 129,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Premium",
//       rating: 4.7,
//     },
//     {
//       id: 3,
//       name: "Toyota Camry",
//       type: "Midsize Sedan",
//       price: 45,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Regular",
//       rating: 4.5,
//     },
//     {
//       id: 4,
//       name: "Mercedes S-Class",
//       type: "Executive Sedan",
//       price: 199,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Premium",
//       rating: 4.9,
//     },
//     {
//       id: 5,
//       name: "Ford Mustang",
//       type: "Sports Car",
//       price: 109,
//       seats: 4,
//       transmission: "Manual",
//       fuel: "Premium",
//       rating: 4.6,
//     },
//     {
//       id: 6,
//       name: "Honda CR-V",
//       type: "Compact SUV",
//       price: 55,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Regular",
//       rating: 4.4,
//     },
//   ];

//   const features = [
//     {
//       icon: <Shield className="h-8 w-8" />,
//       title: "Fully Insured",
//       desc: "Complete peace of mind on every journey",
//       color: "blue",
//     },
//     {
//       icon: <Clock className="h-8 w-8" />,
//       title: "24/7 Service",
//       desc: "Round-the-clock support available",
//       color: "green",
//     },
//     {
//       icon: <DollarSign className="h-8 w-8" />,
//       title: "Best Price",
//       desc: "We match any competitor's price",
//       color: "yellow",
//     },
//     {
//       icon: <Car className="h-8 w-8" />,
//       title: "Wide Selection",
//       desc: "Economy to luxury vehicles",
//       color: "purple",
//     },
//     {
//       icon: <MapPin className="h-8 w-8" />,
//       title: "Flexible Locations",
//       desc: "Multiple pickup/drop-off points",
//       color: "red",
//     },
//     {
//       icon: <Headphones className="h-8 w-8" />,
//       title: "Dedicated Support",
//       desc: "Personal travel concierge",
//       color: "indigo",
//     },
//   ];

//   const steps = [
//     {
//       icon: <Search className="h-8 w-8" />,
//       step: "01",
//       title: "Search & Select",
//       desc: "Browse and choose your perfect vehicle",
//     },
//     {
//       icon: <Calendar className="h-8 w-8" />,
//       step: "02",
//       title: "Book Online",
//       desc: "Secure booking in minutes",
//     },
//     {
//       icon: <Car className="h-8 w-8" />,
//       step: "03",
//       title: "Pick Up & Go",
//       desc: "Collect vehicle with ready paperwork",
//     },
//     {
//       icon: <CreditCard className="h-8 w-8" />,
//       step: "04",
//       title: "Return & Review",
//       desc: "Simple return process",
//     },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Business Traveler",
//       content:
//         "RentRide made my business trips effortless. The vehicles are always clean and reliable.",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Family Vacationer",
//       content:
//         "Perfect service for our family road trip. The SUV was spacious and comfortable.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Emma Rodriguez",
//       role: "Adventure Seeker",
//       content:
//         "I rented a 4x4 for my mountain trip and it performed flawlessly.",
//       rating: 4,
//     },
//     {
//       id: 4,
//       name: "David Wilson",
//       role: "Event Planner",
//       content:
//         "We use RentRide for all our corporate events. Their luxury vehicles always impress.",
//       rating: 5,
//     },
//   ];

//   const navItems = [
//     { name: "Home", href: "#" },
//     { name: "Vehicles", href: "#" },
//     { name: "Services", href: "#" },
//     { name: "About Us", href: "#" },
//     { name: "Contact", href: "#" },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ===== HEADER ===== */}
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <Car className="h-8 w-8 text-blue-600" />
//               <div>
//                 <span className="text-2xl font-bold text-gray-900">Rent</span>
//                 <span className="text-2xl font-bold text-blue-600">Ride</span>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </nav>

//             {/* CTA Buttons */}
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="flex items-center text-gray-600">
//                 <Phone className="h-4 w-4 mr-2" />
//                 <span className="font-medium">(555) 123-4567</span>
//               </div>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                 Login
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-gray-600" />
//               ) : (
//                 <Menu className="h-6 w-6 text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4 border-t">
//               <div className="flex flex-col space-y-4">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="text-gray-700 hover:text-blue-600 font-medium py-2"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//                 <div className="pt-4 space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <Phone className="h-4 w-4 mr-2" />
//                     <span className="font-medium">(555) 123-4567</span>
//                   </div>
//                   <button className="block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 text-center">
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ===== HERO SECTION ===== */}
//       <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//               Find Your Perfect Ride for Every Journey
//             </h1>
//             <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
//               Premium vehicles, competitive rates, and exceptional service. Book
//               your ride in minutes and hit the road with confidence.
//             </p>
//           </div>

//           {/* Search Form */}
//           <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
//             <form onSubmit={handleSearch} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {/* Location */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-gray-700 font-medium">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     Pick-up Location
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter city or airport"
//                     value={searchQuery.location}
//                     onChange={(e) =>
//                       setSearchQuery({
//                         ...searchQuery,
//                         location: e.target.value,
//                       })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Pickup Date */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-gray-700 font-medium">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Pick-up Date
//                   </label>
//                   <input
//                     type="date"
//                     value={searchQuery.pickupDate}
//                     onChange={(e) =>
//                       setSearchQuery({
//                         ...searchQuery,
//                         pickupDate: e.target.value,
//                       })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Return Date */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-gray-700 font-medium">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Return Date
//                   </label>
//                   <input
//                     type="date"
//                     value={searchQuery.returnDate}
//                     onChange={(e) =>
//                       setSearchQuery({
//                         ...searchQuery,
//                         returnDate: e.target.value,
//                       })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Passengers */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-gray-700 font-medium">
//                     <Users className="h-4 w-4 mr-2" />
//                     Passengers
//                   </label>
//                   <select
//                     value={searchQuery.passengers}
//                     onChange={(e) =>
//                       setSearchQuery({
//                         ...searchQuery,
//                         passengers: parseInt(e.target.value),
//                       })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//                       <option key={num} value={num}>
//                         {num} Passenger{num > 1 ? "s" : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//               >
//                 <Search className="h-5 w-5" />
//                 <span>Search Vehicles</span>
//               </button>
//             </form>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
//             {[
//               { value: "10,000+", label: "Happy Customers" },
//               { value: "500+", label: "Vehicles Available" },
//               { value: "24/7", label: "Customer Support" },
//               { value: "50+", label: "Cities Covered" },
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl font-bold mb-2">{stat.value}</div>
//                 <div className="text-blue-200">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== FEATURES SECTION ===== */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose RentRide?
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Experience the difference with our premium rental service designed
//               for modern travelers.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div
//                   className={`${
//                     feature.color === "blue"
//                       ? "bg-blue-100 text-blue-600"
//                       : feature.color === "green"
//                       ? "bg-green-100 text-green-600"
//                       : feature.color === "yellow"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : feature.color === "purple"
//                       ? "bg-purple-100 text-purple-600"
//                       : feature.color === "red"
//                       ? "bg-red-100 text-red-600"
//                       : "bg-indigo-100 text-indigo-600"
//                   } w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
//                 >
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== VEHICLES SECTION ===== */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Featured Vehicles
//               </h2>
//               <p className="text-gray-600">
//                 Choose from our premium selection of vehicles
//               </p>
//             </div>
//             <button className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
//               View All Vehicles
//               <ChevronRight className="h-5 w-5 ml-2" />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {vehicles.map((vehicle) => (
//               <div
//                 key={vehicle.id}
//                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 {/* Vehicle Image Placeholder */}
//                 <div className="relative h-56 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Car className="h-32 w-32 text-white opacity-20" />
//                   </div>
//                   <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
//                     ${vehicle.price}
//                     <span className="text-gray-500 text-xs">/day</span>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {vehicle.name}
//                       </h3>
//                       <p className="text-gray-500">{vehicle.type}</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="ml-1 font-semibold">
//                         {vehicle.rating}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="flex items-center text-gray-600">
//                       <Users className="h-4 w-4 mr-2" />
//                       <span>{vehicle.seats} seats</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Settings className="h-4 w-4 mr-2" />
//                       <span>{vehicle.transmission}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Fuel className="h-4 w-4 mr-2" />
//                       <span>{vehicle.fuel}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Car className="h-4 w-4 mr-2" />
//                       <span>Air Conditioned</span>
//                     </div>
//                   </div>

//                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12 md:hidden">
//             <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
//               View All Vehicles
//               <ChevronRight className="h-5 w-5 ml-2" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ===== HOW IT WORKS SECTION ===== */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Get your rental vehicle in just four simple steps
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {steps.map((step, index) => (
//               <div key={index} className="relative">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full">
//                   <div
//                     className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
//                       index === 0
//                         ? "bg-blue-100 text-blue-600"
//                         : index === 1
//                         ? "bg-green-100 text-green-600"
//                         : index === 2
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-purple-100 text-purple-600"
//                     } mb-6`}
//                   >
//                     {step.icon}
//                   </div>
//                   <div className="absolute -top-3 -left-3 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
//                     {step.step}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600">{step.desc}</p>
//                 </div>

//                 {/* Connecting line for desktop */}
//                 {index < steps.length - 1 && (
//                   <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gray-300"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== TESTIMONIALS SECTION ===== */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Join thousands of satisfied customers who trust us for their
//               journeys
//             </p>
//           </div>

//           <div className="relative max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-xl">
//               <Quote className="h-12 w-12 text-blue-200 mb-6" />

//               <div className="mb-8">
//                 <p className="text-xl text-gray-700 italic mb-6">
//                   "{testimonials[testimonialIndex].content}"
//                 </p>

//                 <div className="flex items-center mb-6">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${
//                         i < testimonials[testimonialIndex].rating
//                           ? "text-yellow-400 fill-current"
//                           : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
//                   {testimonials[testimonialIndex].name.charAt(0)}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-gray-900">
//                     {testimonials[testimonialIndex].name}
//                   </h4>
//                   <p className="text-gray-600">
//                     {testimonials[testimonialIndex].role}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation buttons */}
//             <button
//               onClick={prevTestimonial}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <ChevronLeft className="h-6 w-6 text-gray-700" />
//             </button>
//             <button
//               onClick={nextTestimonial}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <ChevronRight className="h-6 w-6 text-gray-700" />
//             </button>

//             {/* Dots indicator */}
//             <div className="flex justify-center space-x-2 mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setTestimonialIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     index === testimonialIndex
//                       ? "bg-blue-600 w-8"
//                       : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== CTA SECTION ===== */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Hit the Road?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of satisfied customers and experience the best in
//             vehicle rental service.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors">
//               Book Your Ride Now
//             </button>
//             <button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors">
//               Contact Sales
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ===== FOOTER ===== */}
//       <footer className="bg-gray-900 text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//             {/* Brand Column */}
//             <div>
//               <div className="flex items-center space-x-2 mb-6">
//                 <Car className="h-8 w-8 text-blue-400" />
//                 <div>
//                   <span className="text-2xl font-bold">Rent</span>
//                   <span className="text-2xl font-bold text-blue-400">Ride</span>
//                 </div>
//               </div>
//               <p className="text-gray-400 mb-6">
//                 Premium vehicle rental service offering the best rates and
//                 exceptional customer experience.
//               </p>
//               <div className="flex space-x-4">
//                 {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors"
//                   >
//                     <Icon className="h-5 w-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="text-lg font-bold mb-6">Quick Links</h3>
//               <ul className="space-y-3">
//                 {[
//                   "Home",
//                   "Vehicles",
//                   "Services",
//                   "About Us",
//                   "Contact",
//                   "FAQ",
//                 ].map((item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Services */}
//             <div>
//               <h3 className="text-lg font-bold mb-6">Our Services</h3>
//               <ul className="space-y-3">
//                 {[
//                   "Airport Rentals",
//                   "Luxury Cars",
//                   "Business Rentals",
//                   "Long Term Rentals",
//                   "One-way Rentals",
//                   "24/7 Roadside Assistance",
//                 ].map((service) => (
//                   <li key={service}>
//                     <a
//                       href="#"
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       {service}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h3 className="text-lg font-bold mb-6">Contact Us</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start space-x-3">
//                   <Phone className="text-blue-400 mt-0.5 h-5 w-5" />
//                   <span className="text-gray-400">(555) 123-4567</span>
//                 </li>
//                 <li className="flex items-start space-x-3">
//                   <Mail className="text-blue-400 mt-0.5 h-5 w-5" />
//                   <span className="text-gray-400">support@rentride.com</span>
//                 </li>
//                 <li className="flex items-start space-x-3">
//                   <MapPin className="text-blue-400 mt-0.5 h-5 w-5" />
//                   <span className="text-gray-400">
//                     123 Main Street, New York, NY
//                   </span>
//                 </li>
//               </ul>

//               <div className="mt-8">
//                 <h4 className="font-bold mb-4">Subscribe to Newsletter</h4>
//                 <div className="flex">
//                   <input
//                     type="email"
//                     placeholder="Your email"
//                     className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
//                   />
//                   <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg font-semibold transition-colors">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//             <p className="text-gray-400">
//               © {new Date().getFullYear()} RentRide. All rights reserved.
//             </p>
//             <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-400">
//               <a href="#" className="hover:text-white">
//                 Privacy Policy
//               </a>
//               <a href="#" className="hover:text-white">
//                 Terms of Service
//               </a>
//               <a href="#" className="hover:text-white">
//                 Cookie Policy
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
