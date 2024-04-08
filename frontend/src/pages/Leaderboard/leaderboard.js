import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LeaderboardTable from "./LeaderboardTable";
import { alpha } from "@mui/material/styles";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Leaderboard = () => {
  const [leagues, setLeagues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [leaderboardLeagueId, setLeaderboardLeagueId] = useState(null);
  const [selectedLeagueName, setSelectedLeagueName] = useState(""); // Added state for the league's name
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage Modal open/close

  useEffect(() => {
    // Fetch ongoing leagues from the backend
    const fetchLeagues = async () => {
      const response = await fetch("http://localhost:8000/leagues/");
      const data = await response.json();
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    // Fetch ongoing leagues from the backend
    const fetchLeagues = async () => {
      const response = await fetch("http://localhost:8000/leagues/");
      const data = await response.json();
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    // Filter suggestions based on search input
    if (searchInput === "") {
      setSuggestions([]);
    } else {
      const filtered = leagues.filter((league) =>
        league.LeagueName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchInput, leagues]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const match = leagues.find(
        (league) =>
          league.LeagueName.toLowerCase() === searchInput.toLowerCase()
      );
      if (match) {
        setLeaderboardLeagueId(match._id);
        setSelectedLeagueName(match.LeagueName); // Set the league name
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (leagueName, leagueId) => {
    setSearchInput(leagueName);
    setLeaderboardLeagueId(leagueId);
    setSelectedLeagueName(leagueName); // Set the league name
    setSuggestions([]);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "77.69vh",
          left: "0px",
          background: "linear-gradient(100.59deg, #A1C038 0%, #000000 100%)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "calc(1.7em + 1vw)",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1vw",
          }}
        >
          LEAGUE LEADERBOARD
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              width: "44%",
              color: "white",
              fontFamily: "Inter",
              fontSize: "1rem",
              fontWeight: "400",
              textAlign: "center",
              paddingTop: ".5vw",
            }}
          >
            Search for a league to see the leaderboard.
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingTop="3em"
          paddingBottom="3em"
        >
          <Box display="flex" alignItems="center">
            <input
              type="text"
              placeholder="Search for a league..."
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              style={{
                width: "200px",
                height: "50px",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "10px",
                fontFamily: "Arial",
              }}
            />
            {searchInput.length >= 3 && suggestions.length > 0 && (
              <Box
                sx={{
                  width: "200px",
                  maxHeight:
                    suggestions.length > 3
                      ? "150px"
                      : `${50 * suggestions.length}px`, // Dynamic maxHeight adjustment
                  overflowY: "auto",
                  position: "absolute",
                  marginTop: "100px", // Adjusted for clear separation
                  background: "white",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  zIndex: 5, // Ensure this is on top of other elements
                }}
              >
                {suggestions.map((suggestion) => (
                  <Box
                    key={suggestion._id}
                    sx={{
                      padding: "10px",
                      cursor: "pointer",
                      "&:hover": {
                        background: "#f0f0f0",
                      },
                    }}
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion.LeagueName,
                        suggestion._id
                      )
                    }
                  >
                    {suggestion.LeagueName}
                  </Box>
                ))}
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handleOpenModal}
              style={{ marginLeft: "10px", backgroundColor: "#1976D2" }} // Adjust the marginLeft as needed, and set the background color to blue
            >
              Search Private
            </Button>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* Display the selected league's name above the table */}
          {selectedLeagueName && (
            <Typography
              sx={{
                color: "black",
                fontFamily: "Inter",
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
                paddingBottom: "1em",
              }}
            >
              {selectedLeagueName}
            </Typography>
          )}

          <Box
            sx={{
              width: "80%",
              paddingLeft: "1em",
              paddingRight: "1em",
              borderRadius: 4,
              backgroundColor: "#ffffff",
              border: "3px solid #D5FD51",
              "&:hover": {
                boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
              },
            }}
          >
            {leaderboardLeagueId && (
              <LeaderboardTable selectedLeague={leaderboardLeagueId} />
            )}
          </Box>
        </Box>
      </Box>
      <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filler
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Placeholder content goes here.
            </Typography>
          </Box>
        </Modal>
    </Box>
  );
};
