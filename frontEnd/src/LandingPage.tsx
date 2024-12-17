import {Box, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function LandingPage() {
    const navigate = useNavigate();

    const handleBoxClick = (path) => {
        navigate(path);
    };

    return (
        <Grid
            container
            spacing={2}
            style={{
                width: '80vw',
                height: '80vh',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Left Box */}
            <Grid item xs={12} sm={6} md={6} style={{ height: '100%' }}>
                <Box
                    sx={{
                        height: '100%',
                        backgroundColor: 'lightblue',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleBoxClick('/catering')}
                >
                    Catering Business
                </Box>
            </Grid>

            {/* Right Box */}
            <Grid item xs={12} sm={6} md={6} style={{ height: '100%' }}>
                <Box
                    sx={{
                        height: '100%',
                        backgroundColor: 'lightcoral',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleBoxClick('/')}
                >
                   Beauty business
                </Box>
            </Grid>
        </Grid>
    );
}