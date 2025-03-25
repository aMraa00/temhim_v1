import { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("http://west.edu.mn:3000/api/v1/news").then((response) => {
      setNews(response.data.slice(0, 3));
    });

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-5">
      <div className="overflow-hidden rounded-lg">
        {news.length > 0 ? (
          <div className="relative flex transition-transform duration-700 ease-in-out transform">
            {news.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Мэдээлэл ачааллаж байна...</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
