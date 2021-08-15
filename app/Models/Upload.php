<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use LogicException;
use InvalidArgumentException;
use Symfony\Component\Mime\Exception\LogicException as ExceptionLogicException;
use Throwable;

class Upload extends Model
{
    use HasFactory, HasTranslations;

    /**
     * The attributes that are translatable.
     *
     * @var array
     */
    public $translatable = [
        'filename',
        'filetype',
        'width',
        'height',
        'filesize',
        'alt_text'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'filename',
        'filetype',
        'width',
        'height',
        'filesize',
        'alt_text'
    ];

    protected $appends = ['public_link'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'width' => 'number',
        'height' => 'number',
    ];

    /**
     * Upload a file and save it in the database
     *
     * @param UploadedFile $file The uploaded file
     * @param string $pathPrefix Prefix for path
     * @return Upload
     * @throws Exception
     * @throws LogicException
     * @throws InvalidArgumentException
     * @throws ExceptionLogicException
     * @throws BindingResolutionException
     * @throws Throwable
     */
    public static function add(UploadedFile $file, string $pathPrefix = '', int | null $assetId = null) {
        if (!$assetId) {
            $preseveLocal = App::getLocale();

            App::setLocale('en');
        }

        $uploadedFileName = $file->getClientOriginalName();

        $path = (!empty($pathPrefix) ? $pathPrefix . '/' : '') . uniqid();

        $filename = pathinfo($uploadedFileName, PATHINFO_FILENAME);
        $extension = pathinfo($uploadedFileName, PATHINFO_EXTENSION);

        if ($assetId) {
            $upload = self::find($assetId);
        } else {
            $upload = new self;
        }

        $safeFilename = Str::slug($filename) . '-' . Str::random(5) . '.' . $extension;
        $storedFilename = $path . '/' . $safeFilename;

        $upload->filename = $storedFilename;
        $upload->filetype = $file->getMimeType();
        $upload->filesize = $file->getSize();

        if(substr($file->getMimeType(), 0, 5) == 'image' && $extension !== 'svg') {
            $dimensions = getimagesize($file);
            $upload->width = $dimensions[0];
            $upload->height = $dimensions[1];
        } else {
            $upload->width = 0;
            $upload->height = 0;
        }

        $file->storePubliclyAs($path, $safeFilename);

        $upload->saveOrFail();

        if (!$assetId) {
            App::setLocale($preseveLocal);
        }

        return $upload;
    }

    /**
     * Get the full URL for this asset
     *
     * @return string
     */
    public function getPublicLinkAttribute()
    {
        return Storage::url($this->filename);
    }
}
