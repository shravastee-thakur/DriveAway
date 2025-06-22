import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#27667B] text-white">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-12 pt-12 ">
        <div>
          <h1 className="text-2xl font-bold">DriveAway</h1>
          <p className="mt-3">
            We offers a big range of vehicles <br />
            for all your driving needs. We <br />
            have the perfect car to meet <br />
            your needs.
          </p>
          <p className="mt-3">Phone: (123)-456-789</p>
          <p className="mt-3">Email: driveaway@example.com</p>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Company</h1>
          <ul className="mt-3">
            <li className="mt-3">About Us</li>
            <li className="mt-3">Career</li>
            <li className="mt-3">Blog</li>
            <li className="mt-3">How we work</li>
          </ul>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Working Hours</h1>
          <p className="mt-3">Mon - Fri: 9:00AM - 9:00PM</p>
          <p className="mt-3">Sat: 9:00AM - 19:00PM</p>
          <p className="mt-3">Sun: Closed</p>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Subscription</h1>
          <p className="mt-3">
            Subscribe your Email address for latest news & updates.
          </p>
          <div className="flex flex-col mt-3">
            <input
              className="mt-1 px-3 py-2 text-center "
              type="email"
              placeholder="Enter Email Address"
            />
            <button className="bg-[#A0C878] hover:bg-[#DDEB9D] text-white px-4 py-2 mt-2 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <p className="mt-3 text-center ">Copyright © 2025 Shravastee.</p>
    </footer>
  );
};

export default Footer;
