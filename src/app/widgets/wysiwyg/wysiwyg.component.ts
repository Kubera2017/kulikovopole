import {
  Component,
  OnChanges,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Compiler,
  ComponentFactory,
  NgModule,
  ModuleWithComponentFactories
 } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnChanges {

  @Input() template: string;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) { }

  cutContentBorders(content: string) {
    // console.log(content);
    if (content.indexOf('<body>') > 0) {
      content = content.substring(content.indexOf('<body>') + 6);
      content = content.substring(0, content.indexOf('</body>'));
      console.log(content);
      return content;
    } else {
      console.log(content);
      return content;
    }
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    const metadata = {
      selector: `runtime-component`,
      template: this.cutContentBorders(this.template)
    };
    const factory = this.createComponentFactorySync(this.compiler, metadata, null);
    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent { name = 'WysiwygField'; };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

}
