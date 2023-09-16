import React, { useState, useEffect, Fragment } from "react";

const ImgWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Fragment>
      <img // eslint-disable-line
        {...rest}
        src={imgSrc}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
        data-testid="fallback_image"
      />
    </Fragment>
  );
};

export default ImgWithFallback;
