import React from 'react';
import PropTypes from 'prop-types';
import {slate, tealish} from '../variables/colors';

const SubstraLogo = ({
                  className, width, height, ...props
              }) => (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={width}
                      height={height}
                      className={className}
                      viewBox="0 0 340 64"
                      {...props}
                  >
                      <g fill="none" fillRule="evenodd">
                          <path
                              fill={slate}
                              d="M.63 57.739C.315 57.483 0 57.036 0 56.46c0-.894.756-1.661 1.638-1.661.44 0 .819.192 1.07.383 4.41 4.025 8.82 5.814 14.867 5.814 6.614 0 11.15-3.77 11.15-8.88v-.128c0-4.728-2.458-7.475-12.473-9.52C5.669 40.297 1.386 36.655 1.386 29.883v-.128C1.386 23.111 7.37 18 15.559 18c5.921 0 10.015 1.533 14.047 4.6.315.256.693.703.693 1.341 0 .895-.756 1.662-1.638 1.662-.378 0-.756-.128-1.07-.384-3.843-3.002-7.686-4.216-12.158-4.216-6.488 0-10.772 3.77-10.772 8.433v.128c0 4.728 2.394 7.603 12.85 9.775C27.717 41.447 32 45.153 32 51.669v.128C32 59.017 25.89 64 17.386 64 10.77 64 5.606 61.892.63 57.739M48 44.993V20.637c0-.881.753-1.637 1.63-1.637.879 0 1.631.756 1.631 1.637v24.041c0 10.385 5.582 16.364 14.864 16.364 8.906 0 14.613-5.412 14.613-16.049V20.637c0-.881.753-1.637 1.631-1.637S84 19.756 84 20.637v23.978C84 57.266 76.662 64 66 64c-10.537 0-18-6.671-18-19.007M122.297 59.051c7.568 0 12.36-3.378 12.36-8.784v-.123c0-5.283-4.73-8.354-13.432-8.354H106.28v17.261h16.018zm-1.45-20.21c6.621 0 11.351-3.132 11.351-8.845v-.123c0-4.73-3.973-7.925-11.036-7.925h-14.883v16.893h14.568zM103 20.597c0-.86.756-1.597 1.64-1.597h16.585c4.982 0 9.018 1.413 11.478 3.809 1.828 1.781 2.837 4.054 2.837 6.757v.122c0 5.836-3.91 8.785-7.504 10.198 5.297 1.351 9.964 4.3 9.964 10.258v.123C138 57.454 131.694 62 122.171 62H104.64c-.884 0-1.64-.737-1.64-1.597V20.597zM153.63 57.739c-.315-.256-.63-.703-.63-1.278 0-.894.756-1.661 1.638-1.661.44 0 .819.192 1.07.383 4.41 4.025 8.82 5.814 14.867 5.814 6.614 0 11.15-3.77 11.15-8.88v-.128c0-4.728-2.458-7.475-12.473-9.52-10.583-2.172-14.866-5.814-14.866-12.586v-.128c0-6.644 5.984-11.755 14.173-11.755 5.921 0 10.015 1.533 14.047 4.6.315.256.693.703.693 1.341 0 .895-.756 1.662-1.638 1.662-.378 0-.756-.128-1.07-.384-3.843-3.002-7.686-4.216-12.158-4.216-6.488 0-10.772 3.77-10.772 8.433v.128c0 4.728 2.394 7.603 12.85 9.775C180.717 41.447 185 45.153 185 51.669v.128C185 59.017 178.89 64 170.386 64c-6.615 0-11.78-2.108-16.756-6.261M213.84 22.068h-14.307c-.83 0-1.533-.703-1.533-1.534 0-.83.703-1.534 1.533-1.534h31.934c.83 0 1.533.703 1.533 1.534 0 .831-.703 1.534-1.533 1.534H217.16v40.27c0 .895-.766 1.662-1.66 1.662-.894 0-1.66-.767-1.66-1.662v-40.27zM265.47 42.203c7.098 0 12.376-3.771 12.376-10.227v-.128c0-6.008-4.49-9.78-12.193-9.78h-14.499v20.135h14.317zM248 20.663c0-.896.728-1.663 1.578-1.663h16.257c5.217 0 9.402 1.726 11.95 4.41 2.002 2.11 3.215 5.114 3.215 8.31v.128c0 7.479-5.15 12.054-12.309 13.077l-3.645.282h-13.892v17.131c0 .895-.727 1.662-1.576 1.662-.85 0-1.578-.767-1.578-1.662V20.662z"
                          />
                          <g transform="translate(296)">
                              <mask id="logo-mask" fill="#fff">
                                  <path d="M.255.127H43.74v44.747H.255z" />
                              </mask>
                              <path
                                  fill={tealish}
                                  d="M39.829 41.916L21.966 3.84 4.179 41.916h35.65zm-39.317.567L19.717 1.7C20.167.756 20.81.127 21.966.127h.128c1.156 0 1.799.629 2.248 1.573l19.141 40.656c.193.378.257.693.257 1.008 0 .818-.706 1.51-1.605 1.51H1.797c-.836 0-1.542-.63-1.542-1.384 0-.252.064-.63.257-1.007z"
                                  mask="url(#logo-mask)"
                              />
                          </g>
                          <path
                              fill={slate}
                              d="M269.328 50.628c-.535-.697-.4-1.757.29-2.297.692-.54 1.742-.404 2.277.293l9.777 12.748c.535.697.4 1.757-.29 2.297-.692.54-1.742.404-2.277-.293l-9.777-12.748z"
                          />
                      </g>
                  </svg>
);

SubstraLogo.defaultProps = {
    className: '',
    width: 340,
    height: 64,
};

SubstraLogo.propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default SubstraLogo;
