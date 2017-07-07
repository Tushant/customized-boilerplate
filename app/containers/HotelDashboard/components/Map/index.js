/**
 * Created by Edge on 5/22/2017.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.css';
import classNames from 'classnames';
import mapImg from '../../../../../assets/img/map.png';

const Map = () => (
  <div className={classNames(styles.map)}>
    <h4>Map</h4>
    <div className="row">
      <div className="col-lg-4">
        <form>
          <div className="form-group">
            <label>Latitude</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input type="text" className="form-control" />
          </div>
          <div className="btn-container">
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
    <img className="img-fluid" src={mapImg} alt="map" />
  </div>
);

Map.propTypes = {

};
export default Map;
