<StyledModal
            open={showTeamCreationForm}
            onClose={() => setShowTeamCreationForm(false)}
          >
            {/* <Box margin={5}> */}
            <StyledForm>
              <Typography
                className="bodyText"
                sx={{
                  display: "flex",
                  fontSize: "calc(0.1em + 1vw)",
                  align: "left",
                  marginLeft: "10vw",
                  marginBottom: "8em",
                }}
              >
                <FormControl
                  sx={{
                    height: "7vw",
                    marginLeft: "1.5vw",
                    position: "relative",
                  }}
                >
                  <StyledLabel htmlFor="leagueName">
                    Team Name<span style={{ color: "red" }}>*</span>
                  </StyledLabel>
                  <StyledInput
                    onChange={(event) => setTeamName(event.target.value)}
                    id="leagueName"
                    placeholder="Team1"
                    required
                  />
                  <TextField
                    variant="outlined"
                    onChange={(event) => setTeamName(event.target.value)}
                    label="Team1"
                    required
                  ></TextField>
                  <StyledLabel htmlFor="homeCourtAddress">
                    Home Court Address<span style={{ color: "red" }}>*</span>
                  </StyledLabel>
                  <StyledInput
                    value={homeCourtAddress}
                    onChange={handleHomeCourtAddressChange}
                    id="homeCourtAddress"
                    placeholder="123 Main St"
                    required
                  />
                  {suggestions.length > 0 && (
                    <SuggestionsList>
                      {suggestions.map((suggestion, index) => (
                        <SuggestionItem
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.description}
                        </SuggestionItem>
                      ))}
                    </SuggestionsList>
                  )}
                  {/* Disclaimer text */}
                  <Typography
                    sx={{
                      display: "block",
                      fontSize: "calc(0.5em + 0.5vw)",
                      color: "gray",
                      marginTop: "0.25em",
                      marginBottom: "0.5em",
                    }}
                  >
                    * Ensuring court availability is your team’s responsibility.
                  </Typography>
                  <Typography
                    sx={{
                      height: "20px",
                      fontSize: "calc(0.5em + 0.5vw)",
                      color: "primary",
                      marginTop: "0.5em",
                      marginBottom: "0.5em",
                      visibility: homeCourtMessage ? "visible" : "hidden",
                    }}
                  >
                    {homeCourtMessage}
                  </Typography>

                  <Box>
                    <Button
                      onClick={() => setShowTeamCreationForm(false)}
                      variant="contained"
                      color="grey"
                      sx={{
                        position: "relative",
                        borderRadius: "calc(0.1em + 0.5vw)",
                        width: "50%",
                        pl: "calc(1.5vw)",
                        pr: "calc(1.8vw)",
                        marginTop: "1em",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={addTeamToLeague}
                      variant="contained"
                      color="primary"
                      sx={{
                        position: "relative",
                        borderRadius: "calc(0.1em + 0.5vw)",
                        width: "50%",
                        right: "0px",
                        pl: "calc(1.5vw)",
                        pr: "calc(1.8vw)",
                        marginTop: "1em",
                      }}
                    >
                      Create Team
                    </Button>
                  </Box>
                </FormControl>
              </Typography>
            </StyledForm>
            {/* </Box> */}
          </StyledModal>