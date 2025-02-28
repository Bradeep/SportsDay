import React, { useRef } from "react"

import styles from './styles.module.scss';
import Button from "components/Button";

const Rentor = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const onClickSubmit = () => {
        formRef?.current?.submit()
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(formRef.current){
            const formData = new FormData(formRef.current);

            const values = Object.fromEntries(formData.entries());
            console.log( values);
        }
        // window.alert('Form Submitted');
    }

    return (
        <div className={styles.rentor_wrapper}>
            <form className={styles.rentor_form} ref={formRef} onSubmit={onSubmit} action="javascript:void(0)">
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="name">Name of the product</label>
                    <input className={styles.input} id="name" name="name" />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="description">Description of the product</label>
                    <input className={styles.input} id="description" name="description" />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="size">Size</label>
                    <input className={styles.input} id="size" name="size" />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="price">What's the price? (in Rs)</label>
                    <input className={styles.input} type="number" id="price" name="price" />
                </div>
                <div className={styles.field_wrapper}>
                    <label className={styles.label} htmlFor="category">Choose the category</label>
                    <select className={styles.select_input} id="category" name="category">
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>
                <Button
                    buttonColor="#ffc63d"
                    onClick={onClickSubmit}
                    customClass={styles.submit_button}
                >
                    {"Submit"}
                </Button>
            </form>
        </div>
    )
}

export { Rentor }