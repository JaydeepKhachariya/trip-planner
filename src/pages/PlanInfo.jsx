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
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getHotelBySlug } from "../api/request";
import { useQuery } from "react-query";
import { plans } from "../helper/Plans";
import { FaLocationDot } from "react-icons/fa6";
import { bookModalStyle } from "../helper/styles";

const PlanInfo = () => {
  const { slug } = useParams();
   const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();

  useEffect(() => {
    function fetchPlan() {
      const plan = plans.filter((plan) => plan.id === +slug);
      setSelectedPlan(plan[0]);
    }
    fetchPlan();
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
              {selectedPlan?.name}
            </Typography>
            <Typography
              className="bg-black text-white px-2 rounded-md"
              fontSize={18}
              sx={{ lineHeight: 1.9, marginBottom: 3 }}
            >
              {selectedPlan?.days}
            </Typography>
          </div>
          <img
            loading="lazy"
            src={window.location.origin + "/" + selectedPlan?.image}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="flex items-start justify-between">
            <p className="my-2 text-3xl">{selectedPlan?.price}</p>
            <p className="my-2 text-md">{selectedPlan?.locations}</p>
          </div>
          <Typography
            variant="subtitle1"
            className="text-gray-500"
            sx={{ marginTop: 2 }}
          >
            {selectedPlan?.plan}
          </Typography>
          <div className="w-full flex items-center justify-between">
            <p className="my-2 font-bold flex items-center gap-1">
              <span className="text-gray-500 font-medium flex items-center justify-start gap-2">
                <FaLocationDot /> From
              </span>{" "}
              {selectedPlan?.pick_up_point} -{" "}
              <span className="text-gray-500 font-medium">To</span>{" "}
              {selectedPlan?.drop_point}
            </p>
            <Button onClick={handleOpen} variant="outlined">
              Reserve
            </Button>
          </div>
        </Container>
      </main>
      <BookingModal hotelInfo={selectedPlan} open={open} handleClose={handleClose} />
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
  );
};

export default PlanInfo;


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
          {hotelInfo?.price} price
        </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2"  >{hotelInfo?.date}</Typography>
              <Typography variant="subtitle1">Pickup from : {hotelInfo?.pick_up_point}</Typography>
              <Typography variant="subtitle1">Drop to : {hotelInfo?.drop_point}</Typography>

        <Typography
          fontSize={20}
          fontWeight={"bold"}
          component="p"
          variant="h6"
        >
          Subtotal : {hotelInfo?.price}
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