"use client";

import { useState, memo, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { useStateContext } from "../../context/context";
import { useRouter } from "next/navigation";
import { getSingleUser } from "@/app/server";

interface Body {
  title: string;
  body: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Data {
  Username?: string;
  Active?: string;
  userid?: string;
  userId?: string | number;
  id?: number;
  rrr?: string;
  body?: Body[];
  transactionId?: string;
}

interface Props {
  title: string | JSX.Element;
  subtitle: string[];
  data: Data;
  action?: string;
}

const Dropdown = ({ title, subtitle, data, action }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const userid: string = useAppSelector((state) => state?.user?.user);
  const navigate = useRouter();
  const { setEdit, setEditData, setTable } = useStateContext();
  const handleBtn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleResult = async() => {
    if (action === "view contact") {
      setEdit(true);
      const res = await getSingleUser(data?.altirevId)
      setEditData(data);
    }
    if (action === "view result") {
      navigate.push(`/dashboard/result/${data?.id}`);

      setEditData(data);
      setEdit(true);
    }
    // if(action === 'view contact'){
    // setEdit(true);
    // setEditData(data);
    // }
    if (action === "view report") {
      navigate.push(`/dashboard/report/${data?.id}`);

      setEditData(data);
    }
  };

  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard/report/:{id}");
    navigate.prefetch(`/dashboard/result/:{id}`);
  }, [navigate]);

  const handleClose = (item: string) => {
    setAnchorEl(null);
    if (item === "Suspend") {
      setEdit(true);
      setEditData(data);
      setTable("suspend");
    }
    if (item === "Reassign Role") {
      setEdit(true);
      setEditData(data);
      setTable("reassign");
    }
    if (item === "Delete") {
      setEdit(true);
      setEditData(data);
      setTable("delete");
    }

    if (item === "View Contact") {
      setEdit(true);
      setTable("profile");
      setEditData(data);
    }
    if (item === "change status") {
      setEdit(true);
      setTable("change status");
      setEditData(data);
    }
    if (item === "view report") {
      navigate.push(`/dashboard/report/${data?.id}`);
      setEditData(data);
    }
  };

  return (
    <>
      {subtitle?.length > 0 ? (
        <>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleBtn}
            className="!bg-transparent !text-xs !text-secondary"
            // endIcon={<KeyboardArrowDownIcon />}
          >
            {title}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {subtitle?.map((item) => (
              <MenuItem
                key={item}
                className="capitalize text-xs"
                onClick={() => handleClose(item)}
                disableRipple
              >
                {item}
              </MenuItem>
            ))}
          </StyledMenu>
        </>
      ) : (
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleResult}
          className="!bg-transparent !text-xs !text-secondary"
          // endIcon={<KeyboardArrowDownIcon />}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default memo(Dropdown);

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
