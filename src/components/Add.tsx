import styles from './Add.module.css';
import { Form, Modal } from 'react-bootstrap';
import { ReactNode, useState } from 'react';
import { PlusCircle } from '@phosphor-icons/react';

interface IProps {
  title: string;
  children: ReactNode | ReactNode[];
  onSubmit: () => Promise<void>;
  size: number;
}

export function Add({ title, onSubmit, children, size }: IProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <article className={styles.add}>
      <PlusCircle size={size} onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={styles.headerModal}>
          <Modal.Title className={styles.headerTitle}>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={onSubmit}>
            { children }
          </Form>
        </Modal.Body>
      </Modal>
    </article>
  )
}