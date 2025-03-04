import React, { useRef } from "react"

import styles from './styles.module.scss';
import Button from "components/Button";

const Rentor = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);

            formData.append("is_available", "true");

            try {
                const response = await fetch("http://localhost:3001/api/events", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Response from server:", data);
                window.alert("Successfully uploaded");
                formRef.current.reset();
            } catch (error) {
                window.alert("Something went wrong! Please check the details and try again")
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className={styles.rentor_wrapper}>
            <form className={styles.rentor_form} ref={formRef} onSubmit={onSubmit} action="#" encType="multipart/form-data">
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="name">Name of the product</label>
                    <input className={styles.input} id="name" name="event_name" required />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="size">Size</label>
                    <select className={styles.select_input} id="size" name="size" required>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="price">What's the price? (in Rs)</label>
                    <input className={styles.input} type="number" id="price" name="price" required />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="category">Choose the category</label>
                    <select className={styles.select_input} id="category" name="event_category" required>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="image">Upload Image</label>
                    <input
                        className={styles.file_input}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                    />
                </div>
                <Button
                    buttonColor="#ffc63d"
                    customClass={styles.submit_button}
                >
                    {"Submit"}
                </Button>
            </form>
        </div>
    )
}

export { Rentor }