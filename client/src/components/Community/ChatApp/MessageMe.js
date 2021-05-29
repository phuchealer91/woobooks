import { Image } from 'antd'
import React from 'react'
import Times from './Times'

function MessageMe({ user, msg, isShowTime, setIsShowTime }) {
  return (
    <React.Fragment>
      <div
        className="py-1 flex flex-row justify-end transition"
        onClick={() => setIsShowTime(!isShowTime)}
      >
        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          {msg.text && (
            <div className="flex items-center flex-row-reverse group">
              <p className="px-4 py-2 rounded-xl rounded-br-none bg-blue-500 max-w-xs lg:max-w-md">
                {msg.text}
              </p>
            </div>
          )}
          {msg.call && (
            <div className="flex items-center flex-row-reverse group">
              <p className="px-4 py-2 rounded-xl rounded-br-none bg-gray-100 max-w-xs lg:max-w-lg">
                <div className="text-sm text-gray-600 font-semibold">
                  Cuộc gọi kết thúc.
                </div>
                <span className="text-xs text-gray-500">
                  {msg.call.times === 0 ? (
                    <Times total={0} />
                  ) : (
                    <Times total={msg.call.times} />
                  )}{' '}
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <div className="pt-1 flex items-center">
                  {msg.call.video === false ? (
                    <div className="bg-red-500 w-11 h-11 flex items-center justify-center rounded-full">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 511.632 511.632"
                        style={{ width: '24px', height: '24px' }}
                        fill="#ffffff"
                        xmlSpace="preserve"
                      >
                        <g transform="translate(0 -1)">
                          <g>
                            <g>
                              <path
                                d="M504.965,377.246c-19.435-36.715-81.472-73.813-88.704-78.059c-14.421-8.192-29.739-10.731-42.987-6.997
				c-10.432,2.88-18.965,9.301-24.789,18.624c-8.128,9.664-18.176,21.056-20.288,22.912c-16.384,11.115-27.179,9.963-41.323-4.181
				c-4.629-4.651-11.136-6.997-17.749-6.08c-6.507,0.811-12.309,4.608-15.68,10.261l-42.389,71.509
				c-4.971,8.384-3.627,19.093,3.264,25.963c61.141,61.141,113.301,81.429,155.627,81.429c46.059,0,80.448-24.043,102.037-45.632
				l22.912-22.912C512.666,426.312,516.72,399.475,504.965,377.246z"
                              />
                              <path
                                d="M96.506,304.559c3.755,0,7.509-0.981,10.88-2.987l71.488-42.411c5.675-3.349,9.493-9.152,10.304-15.68
				s-1.429-13.099-6.08-17.749c-14.336-14.336-15.403-24.747-4.757-40.533c2.411-2.859,13.803-12.949,23.488-21.056
				c9.301-5.824,15.723-14.357,18.624-24.789c3.669-13.312,1.195-28.587-7.147-43.2c-4.117-7.019-41.216-69.056-77.931-88.491
				C113.189-4.071,86.288-0.039,68.538,17.732L45.626,40.644C4.197,82.073-46.235,170.649,81.424,298.308
				C85.52,302.425,90.981,304.559,96.506,304.559z"
                              />
                              <path
                                d="M441.319,71.309c-8.341-8.341-21.824-8.341-30.165,0l-384,384c-8.341,8.341-8.341,21.824,0,30.165
				c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251l384-384C449.66,93.133,449.66,79.65,441.319,71.309z"
                              />
                            </g>
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </div>
                  ) : (
                    <div className="bg-red-500 w-11 h-11 flex items-center justify-center rounded-full">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 520 520"
                        xmlSpace="preserve"
                        style={{ width: '24px', height: '24px' }}
                        fill="#ffffff"
                      >
                        <g>
                          <path
                            d="M505.29,157.622c-9.005-5.568-20.585-6.075-30.037-1.342L397,195.244v-42.185c0-16.862-13.256-30.136-30.118-30.136
		H183.734l-68.365-80.99c-10.883-12.866-30.131-14.591-43.027-3.685C59.476,49.14,57.866,68.36,68.764,81.233l335.867,396.909
		c6.038,7.134,14.641,10.797,23.318,10.797c6.962,0,13.97-2.377,19.71-7.23c12.866-10.891,14.276-30.164,3.378-43.038L397,375.045
		v-19.903l78.136,38.964c4.309,2.154,9.098,3.22,13.764,3.22c5.576,0,11.435-1.528,16.34-4.562
		c8.99-5.561,14.76-15.386,14.76-25.971v-183.2C520,173.007,514.28,163.183,505.29,157.622z"
                          />
                          <path d="M0,153.059v244.267c0,16.862,14.138,30.597,31,30.597h260.756L29.879,122.647C13.443,123.128,0,136.499,0,153.059z" />
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </div>
                  )}
                </div>
              </p>
            </div>
          )}
          <Image.PreviewGroup>
            {msg.medias &&
              msg.medias.map((item, index) => (
                <div key={index}>
                  {item.url.match(/video/i) ? (
                    <div className="flex items-center flex-row-reverse group">
                      <div className="py-2 w-56 h-56 relative flex flex-shrink-0 max-w-xs lg:max-w-md flex-wrap">
                        <video
                          controls
                          className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                          src={item.url}
                          alt="video"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center flex-row-reverse group">
                      <div className="py-2 w-56 h-56 relative flex flex-shrink-0 max-w-xs lg:max-w-md flex-wrap">
                        <Image
                          className=" absolute w-full h-full shadow-md rounded-l-lg object-cover"
                          src={item.url}
                          alt={item.url}
                          style={{
                            width: '224px',
                            height: '224px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </Image.PreviewGroup>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MessageMe
