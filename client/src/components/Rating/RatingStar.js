import React, {useContext, useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import star from "../../assets/star.png";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createRate, getRatingByDeviceId, getRatingByDeviceIdAndUserId} from "../../http/ratingApi";
import {fetchOneDevice, updateDeviceRating} from "../../http/deviceApi";
import * as styles from './RatingStar.module.scss';

const RatingStar = observer(({deviceId}) => {
  const {rating, user, alert} = useContext(Context)
  const [stars, setStars] = useState(false)
  const [ratePos, setRatePos] = useState(true)

  const rateDevice = async (rateValue) => {
    await createRate(rateValue, user.user.id, deviceId)
    const fetchDeviceRating = await getRatingByDeviceId(deviceId)
    let ratingSum = 0
    fetchDeviceRating.forEach(i => {
      ratingSum = ratingSum + Number(i.rate)
    })
    const newRating = ratingSum / fetchDeviceRating.length || 0
    await updateDeviceRating(deviceId, newRating)
    await fetchOneDevice(deviceId)
    alert.setAlert(true);
    setTimeout(() => alert.setAlert(false), 3000);
  }

  useEffect(() => {
    if (user.isAuth) {
      getRatingByDeviceIdAndUserId(deviceId, user.user.id).then(data => {
        data.length ? setRatePos(false) : setRatePos(true)
      });
    }
  }, [deviceId, user.user.id, alert.alert, user.isAuth])

  return (
    <div className="d-flex align-items-center">
      {user.isAuth
        ?
        (ratePos)
          ?
          <div
            onMouseEnter={() => setStars(true)}
            onMouseLeave={() => setStars(false)}
          >
            {stars
              ?
              <div
                className={styles.starContainer}
              >
                {rating.ratings.map(rate =>
                  rate.id === rating.selectedRating.id
                    ?
                    <span
                      key={rate.id}
                      onClick={() => rateDevice(rate.id)}
                    >
                    &#9733;
                  </span>
                    :
                    <Image
                      width={18}
                      height={18}
                      src={star}
                      key={rate.id}
                      onMouseEnter={() =>
                        rate.id === rating.selectedRating.id
                          ?
                          rating.setSelectedRating({})
                          :
                          rating.setSelectedRating(rate)
                      }
                    />
                )}
              </div>
              :
              <Image width={18} height={18} src={star}/>
            }
          </div>
          :
          <span>&#9733;</span>
        :
        <Image width={18} height={18} src={star}/>
      }
    </div>
  );
});

export default RatingStar;