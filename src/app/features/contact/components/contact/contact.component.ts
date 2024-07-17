import { Component, ElementRef, ViewChild } from '@angular/core';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  arrow = faAnglesDown;

  targetEmail: string;

  // Form controls
  firstFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
  });
  thirdFormGroup: FormGroup = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      email: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      message: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      let contactForm = {
        name: this.firstFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        message: this.thirdFormGroup.value.message
      };
      console.log('Form Submitted!');
    } else {
      console.log('Form not valid');
    }
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play().then(r => r).catch(e => e);
    }
  }

}
