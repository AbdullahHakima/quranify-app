
import { Home, BookOpen, Clock, Video, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Clock, label: "Shalat", path: "/prayer" },
    { icon: BookOpen, label: "Kajian", path: "/kajian" },
    { icon: Video, label: "Doa", path: "/doa" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
