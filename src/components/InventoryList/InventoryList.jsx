import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import deleteButton from "../../assets/icons/delete_outline-24px.svg";
import editButton from "../../assets/icons/edit-24px.svg";
import sortButton from "../../assets/icons/sort-24px.svg";
import chevronButton from "../../assets/icons/chevron_right-24px.svg";

import "./InventoryList.scss";
import { Link, useParams } from "react-router-dom";
