
function MaskIcon({ src, className = '' }) {
  const style = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
  };

  return <span className={`mask-icon ${className}`} style={style} aria-hidden="true" />;
}

export default MaskIcon;
