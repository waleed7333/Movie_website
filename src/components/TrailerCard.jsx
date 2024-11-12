import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import TrailerModal from "./TrailerModal"; // Import the modal component
import { FaPlay } from "react-icons/fa"; // Import play icon

const TrailerCard = ({ image, loading, title, movieId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card 
        shadow="sm" 
        isPressable 
        className="w-60 inline-flex m-2 relative overflow-hidden" 
        onClick={handleOpenModal}
      >
        <CardBody className="p-0 relative">
          {loading ? (
            <div className="w-full h-[140px] bg-gray-300 animate-pulse"></div>
          ) : (
            <div className="relative">
              {/* Image */}
              <Image
                className="w-full object-cover h-[140px] z-0" // Ensure the image is behind
                src={image}
                alt={title}
                width={350}
                height={250}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
                {/* Play button */}
                <FaPlay className="text-white text-4xl" />
              </div>
            </div>
          )}
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b className="truncate">{title}</b>
        </CardFooter>
      </Card>

      {/* Modal for Trailer */}
      <TrailerModal movieId={movieId} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default TrailerCard;
