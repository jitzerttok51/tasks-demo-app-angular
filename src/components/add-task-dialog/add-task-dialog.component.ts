import { Component, ElementRef, HostListener, ViewChild, output } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskCreate } from "../../models/TaskCreate";

@Component({
    selector: 'app-add-task-dialog',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl:'./add-task-dialog.component.html',
    styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialog {

    @ViewChild("dialog")
    dialog!: ElementRef<HTMLDialogElement>

    submit = output<TaskCreate>();
    cancel = output<void>();

    form = this.fb.group({
        title: new FormControl<string>('', [Validators.required]),
        summary: new FormControl<string>('', [Validators.required]),
        dueDate: new FormControl<Date>(new Date(), [Validators.required]),
    })

    constructor(private readonly fb: FormBuilder) {

    }

    // @HostListener('document:click', ['$event'])
    // clickout(event: Event) {
    //   if(this.dialog.nativeElement.contains(event.target as Node)) {
    //     this.closeDialog()
    //   }
    // }

    @HostListener('document:keydown', ['$event']) 
    onKeydownHandler(event: KeyboardEvent) {
        if (event.key === "Escape") {
            this.closeDialog()
        }
    }

    openDialog() {
        this.form.reset()
        this.dialog.nativeElement.showModal()
    }

    closeDialog() {
        this.dialog.nativeElement.close()
        this.cancel.emit()
    }

    get title(): string {
        return this.form.value['title'] || ''
    }

    get summary(): string {
        return this.form.value['summary'] || ''
    }

    get dueDate(): Date {
        return this.form.value['dueDate'] || new Date()
    }


    submitDialog() {
        let resposne: TaskCreate = {title: this.title, summary: this.summary, dueDate: this.dueDate}
        this.dialog.nativeElement.close()
        this.submit.emit(resposne)
    }
}