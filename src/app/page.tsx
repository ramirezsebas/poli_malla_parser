'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Button from '@mui/material/Button';
import React from 'react';
import { Alert, Box, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import style from 'styled-jsx/style';


enum Extension {
    EXCEL = "excel",
    JSON = "json"
}

export default function Home() {

    const [loadingMallaJson, setLoadingMallaJson] = React.useState<boolean>(false);
    const [downloadingMallaJson, setDownloadingMallaJson] = React.useState<boolean>(false);
    const [errorMallaJson, setErrorMallaJson] = React.useState<string | null>(null);

    const [loadingMallaExcel, setLoadingMallaExcel] = React.useState<boolean>(false);
    const [downloadingMallaExcel, setDownloadingMallaExcel] = React.useState<boolean>(false);
    const [errorMallaExcel, setErrorMallaExcel] = React.useState<string | null>(null);

    const [file, setFile] = React.useState<File | null>(null);
    const [errorFile, setErrorFile] = React.useState<string | null>(null);


    const handleDownload = (extension: Extension) => {
        if (extension === Extension.EXCEL) {
            setLoadingMallaExcel(true);
            fetch("/api/malla-excel")
                .then(response => {
                    if (!response.ok || response.status !== 200) {
                        setErrorMallaExcel("Error al descargar la malla");
                        setTimeout(() => {
                            setErrorMallaExcel(null);
                        }, 3000);
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    const linkResponse = data.link;
                    setDownloadingMallaExcel(true);
                    fetch(linkResponse)
                        .then(response => {
                            setErrorMallaExcel("Error al descargar la malla");
                            setTimeout(() => {
                                setErrorMallaExcel(null);
                            }, 3000);
                            return response.blob();
                        })
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
                        .catch(() => {
                            setErrorMallaExcel("Error al descargar la malla");
                            setTimeout(() => {
                                setErrorMallaExcel(null);
                            }, 3000);
                        })
                        .finally(() => {
                            setDownloadingMallaExcel(false);
                        });

                })
                .catch((error) => {
                    setErrorMallaExcel("Error al descargar la malla");
                    setTimeout(() => {
                        setErrorMallaExcel(null);
                    }, 3000);
                })
                .finally(() => {
                    setLoadingMallaExcel(false);
                });



        } else if (extension === Extension.JSON) {
            setLoadingMallaJson(true);

            if (!file) {
                setErrorFile("No se ha subido ningun archivo");
                return;
            }


            const formData = new FormData()

            formData.append('file', file)

            if (formData.get('file') === null) {
                setErrorFile("No se ha subido ningun archivo (key=file)");
                return;
            }

            if (formData.getAll('file').length > 1) {
                setErrorFile("Solo se puede subir un archivo");
                return;
            }

            fetch("/api/mallas",
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(response => {
                    if (!response.ok || response.status !== 200) {
                        setErrorMallaJson("Error al descargar la malla");
                        setTimeout(() => {
                            setErrorMallaJson(null);
                        }, 3000);

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
                    setErrorMallaJson("Error al descargar la malla");
                    setTimeout(() => {
                        setErrorMallaJson(null);
                    }, 3000);

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
                                    setErrorFile("No se ha subido ningun archivo");
                                    return;
                                }

                                if (files.length === 0) {
                                    setErrorFile("No se ha subido ningun archivo");
                                    return;
                                }

                                if (files.length > 1) {
                                    setErrorFile("Solo se puede subir un archivo");
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

            {
                errorMallaExcel && <Alert severity="error">{
                    errorMallaExcel
                }</Alert>

            }

            {
                errorMallaJson && <Alert severity="error">{
                    errorMallaJson
                }</Alert>
            }

            {
                errorFile && <Alert severity="error">{
                    errorFile
                }</Alert>
            }





        </main>
    )
}
