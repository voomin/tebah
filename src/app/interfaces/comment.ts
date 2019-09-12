export interface Comment {
    board_type:string,//review or event
    board_id:string,
    from_uid:string,
    from_displayName:string,
    content:string,
    timestamp:number,
    like:number,
    hate:number,
}
