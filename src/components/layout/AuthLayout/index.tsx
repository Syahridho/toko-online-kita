type PropTypes = {
  children: React.ReactNode;
};

const AuthLayout = (props: PropTypes) => {
  const { children } = props;
  return <div className="max-w-[500px] mx-auto pt-24">{children}</div>;
};

export default AuthLayout;
