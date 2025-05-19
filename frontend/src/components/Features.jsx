// Import necessary libraries and icons
import {
  FaUsers,
  FaMapMarkerAlt,
  FaComments,
  FaStore,
  FaBell,
  FaUserShield
} from 'react-icons/fa';

const Features = () => {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Connect with your community like never before
          </h2>
          <p className="sm:text-xl text-gray-400">
            LivelyChat lets you engage with neighbors, discover hyperlocal updates, and build a real sense of community — right from your building.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaUsers className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Verified Neighbors</h3>
            <p className="text-gray-400">
              Only real people from your building or locality — verified through address — can join your community.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaMapMarkerAlt className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Location-Based Feed</h3>
            <p className="text-gray-400">
              See posts and updates from neighbors around you — no global noise, just hyperlocal insights.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaComments className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Real-Time Interactions</h3>
            <p className="text-gray-400">
              Like, comment, and reply instantly with fellow residents. Your community — active and alive.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaStore className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Local Marketplace</h3>
            <p className="text-gray-400">
              Buy, sell, and share within your community. Whether it’s a couch or home-cooked food — keep it in the neighborhood.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaBell className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Instant Notifications</h3>
            <p className="text-gray-400">
              Never miss a moment. Get alerts when someone posts, comments, or shares an event near you.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaUserShield className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Community Moderation</h3>
            <p className="text-gray-400">
              Appoint trusted residents as building admins to keep your digital community safe and welcoming.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
