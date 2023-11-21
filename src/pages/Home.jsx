import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { HotelCard } from "../components/HotelCard";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { getHotels } from "../api/request";
import { useQuery } from "react-query";
import { plans } from "../helper/Plans";
import { buses } from "../helper/Buses";
import { useNavigate } from "react-router-dom";


export default function Home({ setDarkMode }) {
  


  const [selectedItem, setSelectedItem] = useState("plans");

  const fetchHotels = async () => {
    const { data } = await getHotels();
    return data;
  };

  const { data, isLoading } = useQuery("hotels", fetchHotels);

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <>
      <Navbar setDarkMode={setDarkMode} />
      <main>
        <Container maxWidth={"lg"} sx={{ marginTop: 3 }}>
          <div className="flex items-center justify-start gap-2 mb-5">
            <button
              onClick={() => setSelectedItem("plans")}
              className={`${
                selectedItem === "plans"
                  ? "bg-black text-white"
                  : "bg-none text-black"
              } px-2 py-1 rounded-sm text-xl`}
            >
              Travel plans
            </button>
            <button
              onClick={() => setSelectedItem("hotel")}
              className={`${
                selectedItem === "hotel"
                  ? "bg-black text-white"
                  : "bg-none text-black"
              } px-2 py-1 rounded-sm text-xl`}
            >
              Hotels
            </button>
            <button
              onClick={() => setSelectedItem("bus")}
              className={`${
                selectedItem === "bus"
                  ? "bg-black text-white"
                  : "bg-none text-black"
              } px-2 py-1 rounded-sm text-xl`}
            >
              Buses
            </button>
          </div>
          <Grid container spacing={2}>
            {selectedItem === "hotel"
              ? data?.map((item) => (
                  <Grid key={item.id} item xs={12} md={4}>
                    <HotelCard hotel={item} />
                  </Grid>
                ))
              :selectedItem === "plans"?plans?.map((item, i) => (
                  <Grid key={i} item xs={12} md={4}>
                    <PlanCard plan={item} />
                  </Grid>
                ))
                :
                buses.map((el,i)=>{
                  return(
                    <Grid key={i} item xs={12} md={4}>
                    <BusCard bus={el} />
                  </Grid>
                  )
                })
              }
          </Grid>
        </Container>
      </main>
    </>
  );
}

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/plans/${plan.id}`)}
    >
      <CardMedia
        sx={{ objectFit: "cover" }}
        component="img"
        height="244"
        image={plan.image}
        alt="Paella dish"
        loading="lazy"
      />
      <CardContent>
        <Typography sx={{ cursor: "pointer" }}>{plan.name}</Typography>
        <Typography marginTop={1} fontSize={14}>
          {plan.price} price for {plan.days}
        </Typography>
      </CardContent>
    </Card>
  );
};

const BusCard = ({ bus }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/bus/${bus.id}`)}
    >
      <CardMedia
        sx={{ objectFit: "cover" }}
        component="img"
        height="244"
        image={bus.img}
        alt="Paella dish"
        loading="lazy"
      />
      <CardContent>
        <Typography sx={{ cursor: "pointer" }}>{bus.name}</Typography>
        <Typography marginTop={1} fontSize={14}>
          {bus.ticketPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};
