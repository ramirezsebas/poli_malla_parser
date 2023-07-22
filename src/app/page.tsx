'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Button from '@mui/material/Button';
import React from 'react';
import { Box, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import style from 'styled-jsx/style';


enum Extension {
    EXCEL = "excel",
    JSON = "json"
}

export default function Home() {

    const [loadingMallaJson, setLoadingMallaJson] = React.useState<boolean>(false);
    const [downloadingMallaJson, setDownloadingMallaJson] = React.useState<boolean>(false);

    const [loadingMallaExcel, setLoadingMallaExcel] = React.useState<boolean>(false);
    const [downloadingMallaExcel, setDownloadingMallaExcel] = React.useState<boolean>(false);

    const [file, setFile] = React.useState<File | null>(null);


    const handleDownload = (extension: Extension) => {
        if (extension === Extension.EXCEL) {
            setLoadingMallaExcel(true);
            fetch("/api/malla-excel")
                .then(response => {
                    if (!response.ok || response.status !== 200) {
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    const linkResponse = data.link;
                    setDownloadingMallaExcel(true);
                    fetch(linkResponse)
                        .then(response => response.blob())
                        .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = url;
                            a.download = 'malla.xlsx';
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }
                        )
                        .catch(() => alert('oh no!'))
                        .finally(() => {
                            setDownloadingMallaExcel(false);
                        });

                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoadingMallaExcel(false);
                });



        } else if (extension === Extension.JSON) {
            setLoadingMallaJson(true);

            if (!file) {
                return;
            }


            const formData = new FormData()

            formData.append('file', file)
            fetch("/api/mallas",
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(response => {
                    if (!response.ok || response.status !== 200) {
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    setDownloadingMallaJson(true);
                    const mallaGenerada = data;

                    const url = window.URL.createObjectURL(new Blob([JSON.stringify(mallaGenerada)]));

                    const a = document.createElement('a');

                    a.style.display = 'none';

                    a.href = url;

                    a.download = 'malla.json';

                    document.body.appendChild(a);

                    a.click();

                    window.URL.revokeObjectURL(url);

                    setDownloadingMallaJson(false);

                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoadingMallaJson(false);
                });

        }
    }

    if (loadingMallaExcel || loadingMallaJson || downloadingMallaExcel || downloadingMallaJson) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <CircularProgress />
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Malla Parser de la Poli
                </p>
                <div>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{' '}
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.vercelLogo}
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.grid}>

                <Button onClick={
                    () => handleDownload(Extension.EXCEL)
                } className={styles.card} variant="contained" color="primary">
                    Descargar Malla en formato excel
                </Button>

                {
                    file ? <Button onClick={
                        () => handleDownload(Extension.JSON)
                    }
                        className={styles.card} variant="contained" color="primary">
                        Descargar Malla en formato JSON
                    </Button> : <Button
                        variant="contained"
                        component="label"
                        className={styles.card}
                    >
                        Subir Malla
                        <input
                            type="file"
                            hidden
                            onChange={(event) => {
                                const files = event.target.files;

                                if (!files) {
                                    return;
                                }

                                if (files.length === 0) {
                                    return;
                                }

                                if (files.length > 1) {
                                    alert("Solo se puede subir un archivo");
                                    return;
                                }
                                setFile(files[0]);
                            }}
                        />
                    </Button>
                }

            </div>
            {
                file && <div className={styles.center}>
                    <Typography variant="body1" gutterBottom>
                        <b>Archivo Subido:</b> {file?.name}
                    </Typography>
                </div>
            }




        </main>
    )
}
