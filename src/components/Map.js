/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.157588, 129.058822),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    const marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
    const latLng = map.getCenter();

    // 현 위치 및 마커 표시 코드 시작
    if (navigator.geolocation) {
      // eslint-disable-next-line
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = '';
        let lng = '';
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        // eslint-disable-next-line
        let locPosition = new kakao.maps.LatLng(lat, lng);

        // eslint-disable-next-line
        displayMarker(locPosition);

        // eslint-disable-next-line
        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    }

    function displayMarker(locPosition) {
      // 마커를 생성합니다

      // eslint-disable-next-line
      var marker = new kakao.maps.Marker({
        // eslint-disable-next-line
        map: map,
        position: locPosition
      });
      map.setCenter(locPosition);
    }
    // 현 위치 및 마커 표시 코드 끝.

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(latLng, displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = result[0].road_address
            ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
            : '';
          detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

          const content = `${
            // eslint-disable-next-line no-useless-concat
            '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>'
          }${detailAddr}</div>`;

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);
          const message = `<p>중심 좌표는 위도 ${mouseEvent.latLng.getLat()}, 경도 ${mouseEvent.latLng.getLng()}입니다</p>`;
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = message;

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', () => {
      searchAddrFromCoords(latLng, displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const infoDiv = document.getElementById('centerAddr');

        for (let i = 1; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }, []);

  return (
    <div>
      <div
        className="flex justify-center"
        id="map"
        style={{
          width: '750px',
          height: '825px'
        }}
      />
      <div className="hAddr">
        <span className="title text-white">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr" className="text-white" />
        <p id="result" />
      </div>
    </div>
  );
};

export default Map;
