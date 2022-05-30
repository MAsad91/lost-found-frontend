import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

import styles from "./StatsCard.module.css";

const StatsCard = (props) =>
{   console.log(props);
  return (
    <div className={styles.container}>
      <Grid container spacing={7} justify="center">

        <Grid
          item
          component={Card}
          xs={12}
          md={4}
          className={`${styles.card} ${styles["lost-report"]}`}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Lost Reports
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.lostCount}
                duration={1}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              Number of Lost Items Reports
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          component={Card}
          xs={12}
          md={4}
          className={`${styles.card} ${styles["found-report"]}`}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Found Reports
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.foundCount}
                duration={1}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              Number of Found Items Reports{" "}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsCard;
