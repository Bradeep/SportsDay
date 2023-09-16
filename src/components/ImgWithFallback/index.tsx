import React, { useState, useEffect, Fragment, HTMLProps } from "react";

interface PropsInterface extends HTMLProps<HTMLImageElement> {
  fallbackSrc: string | undefined;
}

const ImgWithFallback = (props: PropsInterface) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

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
