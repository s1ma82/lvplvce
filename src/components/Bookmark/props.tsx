import BookmarkTypes from "@/types/BookmarkTypes";

export default interface Props extends Partial<HTMLDivElement>{
    data?: BookmarkTypes,
    gen?: boolean   
}