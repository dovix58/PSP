const deleteReservations = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`api/v1/reservations/${id}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      console.log("Reservation deleted successfully.");
      return true;
    } else {
      console.error("Failed to delete the reservation.");
      return false;
    }
  } catch (error) {
    console.error("Error during deletion:", error);
    return false;
  }
};

const getReservations = async () => {
  setIsLoading(true);
  try {
    const res = await fetch("api/v1/reservations");
    const resData = await res.json();
    console.log(resData);
    setReservations(resData);
    setIsLoading(false);
  } catch (e) {
    setIsLoading(false);
    console.error("Error fetching reservations:", e);
  }
};
