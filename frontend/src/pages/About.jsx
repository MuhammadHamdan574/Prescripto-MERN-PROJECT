import { assets } from "../assets/assets.js";
const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500 ">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>{" "}
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            harum voluptas libero non vero cum fugit ratione illum sint ullam
            quae, sapiente magnam aperiam sequi sunt debitis assumenda nisi
            obcaecati facere iure error corrupti.{" "}
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            officiis maiores voluptatem iste voluptates veniam molestiae tempora
            porro, laudantium ab. Voluptates delectus id porro praesentium eius
            facere, veritatis, atque labore, accusamus quisquam voluptate
            ducimus.{" "}
          </p>
          <b className="text-gray-800 ">Our Vision</b>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            nulla, amet quas excepturi animi alias officiis accusantium earum
            libero reprehenderit impedit? Temporibus, eaque? Consequuntur, quos!{" "}
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold"> CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficency:</b>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur tenetur praesentium obcaecati
            debitis!
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convience:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. tenetur
            praesentium obcaecati debitis!
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maxime
            tenetur praesentium obcaecati debitis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
