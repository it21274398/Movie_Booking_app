export const generateSeats = (rows = 5, seatsPerRow = 20) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const seats = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = alphabet[r];

    for (let s = 1; s <= seatsPerRow; s++) {
      seats.push({
        seatNumber: `${rowLetter}${s}`,
        isBooked: false,
      });
    }
  }

  return seats;
};
