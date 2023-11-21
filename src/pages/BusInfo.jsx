import {
  Box,
  Button,
  CardContent,
  Container,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ImageGallery } from "./ImageGallery";
import { getHotelBySlug } from "../api/request";
import { useQuery } from "react-query";
import { bookModalStyle } from "../helper/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { plans } from "../helper/Plans";
import { buses } from "../helper/Buses";
import { FaLocationDot } from "react-icons/fa6";

const BusInfo = () => {

     const { slug } = useParams();
   const [open, setOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState();

  useEffect(() => {
    function fetchBus() {
      const bus = buses.filter((bus) => bus.id === +slug);
      setSelectedBus(bus[0]);
    }
    fetchBus();
  }, []);
  
 const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
     <>
      <Navbar />
      <main>
        <Container
          maxWidth={"lg"}
          sx={{
            marginTop: 2,
          }}
        >
          <div className="w-full flex items-center justify-between">
            <Typography fontSize={22} sx={{ lineHeight: 1.9, marginBottom: 3 }}>
              {selectedBus?.name}
            </Typography>
            <Typography
              className="bg-black text-white px-2 rounded-md"
              fontSize={18}
              sx={{ lineHeight: 1.9, marginBottom: 3 }}
            >
              $ {selectedBus?.ticketPrice}
            </Typography>
          </div>
          <img
          className="w-full"
            loading="lazy"
            src={window.location.origin + "/" + selectedBus?.img}
          />
          <div className="flex items-start justify-between">
            <p className="my-2 text-3xl">{selectedBus?.departureTime}</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="my-2 font-bold flex items-center gap-1">
              <span className="text-gray-500 font-medium flex items-center justify-start gap-2">
                <FaLocationDot /> From
              </span>{" "}
              {selectedBus?.departureCity} -{" "}
              <span className="text-gray-500 font-medium">To</span>{" "}
              {selectedBus?.arrivalCity}
            </p>
            <Button onClick={handleOpen} variant="outlined">
              Reserve
            </Button>
          </div>
        </Container>
      </main>
      <BookingModal hotelInfo={selectedBus} open={open} handleClose={handleClose} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              fontSize: 14,
            },
          }}
        />
    </>
  )
}

export default BusInfo


const BookingModal = ({ open, handleClose, hotelInfo })=>{

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

    const handleReserve = async () => {
    setIsLoading(true);
    toast.success("booking successfull");
    handleClose();
    navigate('/')
    setIsLoading(false);
  };
  return(
     <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={bookModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {hotelInfo?.ticketPrice} price
        </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2"  >{hotelInfo?.departureTime}</Typography>
              <Typography variant="subtitle1">Pickup from : {hotelInfo?.departureCity}</Typography>
              <Typography variant="subtitle1">Drop to : {hotelInfo?.arrivalCity}</Typography>

        <Typography
          fontSize={20}
          fontWeight={"bold"}
          component="p"
          variant="h6"
        >
          Subtotal : {hotelInfo?.ticketPrice}
        </Typography>
        <Button
          onClick={handleReserve}
          sx={{ width: "100%", marginTop: 2 }}
          variant="outlined"
          color="primary"
        >
          {isLoading ? (
            <LoadingSpinner color={"primary"} size={20} />
          ) : (
            "Reserve"
          )}
        </Button>
      </Box>
    </Modal>
  )
}