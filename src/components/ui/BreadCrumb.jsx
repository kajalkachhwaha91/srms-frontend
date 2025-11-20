import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const BreadCrumb = ({ linkText }) => {
  const navigate = useNavigate();

  function handleClick(link) {
    if (link.onClick) {
      link.onClick();
    }
    if (link.href) {
      navigate(link.href);
    }
  }

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="medium" />}
        aria-label="breadcrumb"
        className="inline "
        style={{ color: "#cca547" }}
      >
        {linkText.map((item, index) => {
          return !item.href ? (
            <Typography
              className="text-[#cca547] font-semibold"
              key={index}
              sx={{
                color: "#cca547",
                fontWeight: 700, // Make it bold
              }}
              style={{ color: "#CCA547" }}
            >
              {item.text}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color="#cca547"
              fontWeight={500}
              /* href={item.href} */
              onClick={() => handleClick(item)}
              key={index}
              className="text-[#372E2E] font-bold hover:underline cursor-pointer"
              style={{ color: "#CCA547" }}
              sx={{
                fontWeight: 700, // Make it bold
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.text}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadCrumb;
