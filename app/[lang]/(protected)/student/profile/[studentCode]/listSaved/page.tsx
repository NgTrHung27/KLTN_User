"use client";
import { PostSave } from '@prisma/client';
import React from 'react';
interface SaveProps{
    saves? : PostSave[];
}

const ListSaved = ({
    saves
}:SaveProps
) => {
    return (
        <>
           {
            saves?.map((save) =>(
                <h1 key={save.id}>
                       <h1>hello</h1>
                </h1>
            ))}
        </>
    );
};

export default ListSaved;
