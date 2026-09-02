<?php
use Illuminate\Support\Facades\Artisan;
Artisan::command('pos:health', function () { $this->info('NovaPOS API OK'); });
