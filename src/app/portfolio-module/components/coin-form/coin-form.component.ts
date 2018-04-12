import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Coin } from 'app/shared/models';
import { CoinsService, PromptsService } from 'app/core';

@Component({
  selector: 'app-coin-form',
  templateUrl: './coin-form.component.html',
  styleUrls: ['./coin-form.component.css']
})
export class CoinFormComponent {
  @Input()
  private coinId: string;

  public form: FormGroup;
  public isNew: boolean = false;
  private coin: Coin = new Coin();

  constructor(
    private promptsService: PromptsService,
    private coinsService: CoinsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
     this.createForm();
  }

  ngOnChanges(changes) {
    if (changes.coinId) {
      if (changes.coinId.previousValue != changes.coinId.currentValue) {
          switch(this.coinId) {
             case '1': {
               this.isNew = true;
               break;
             }

             default: {
               this.coinsService.getCoin(this.coinId).subscribe((coin: Coin) => {
                 this.coin = coin;
                 this.setFormValues();
               });
             }
          }
      }
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      rating: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      logoUrl: ['', Validators.required],
      contractAddress: ['', Validators.required]
    });
  }

  setFormValues() {
    this.form.patchValue({
      name: this.coin.name,
      symbol: this.coin.symbol,
      type: this.coin.type,
      price: this.coin.price,
      rating: this.coin.rating,
      releaseDate: this.coin.releaseDate,
      description: this.coin.description,
      websiteUrl: this.coin.websiteUrl,
      logoUrl: this.coin.logoUrl,
      contractAddress: this.coin.contractAddress
    });
  }

  async save() {
    this.coin = Object.assign({}, this.coin, this.form.value);

    if(this.isNew) {
       await this.coinsService.createCoin(this.coin);
       this.promptsService.showToast('Coin saved successfully');
       this.router.navigate(['../../summary'], { relativeTo: this.route });
    } else {
      await this.coinsService.updateCoin(this.coin);
      this.promptsService.showToast('Coin Updated successfully');
    }
  }
}
